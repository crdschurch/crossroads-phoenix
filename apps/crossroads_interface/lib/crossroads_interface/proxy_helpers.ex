defmodule CrossroadsInterface.ProxyHelpers do
  require IEx
  @moduledoc """
    Utility methods for the proxy controller
  """

    @doc """
  Removes the first two paths of the url and returns the
  remainder.

  ## Examples

    iex> CrossroadsInterface.ProxyHelpers.strip_proxy_path("/proxy/gateway/api/login")
    "api/login"

  """
  @spec strip_proxy_path(String.t) :: String.t
  def strip_proxy_path(path) do
    path
    |> String.split("/")
    |> Enum.filter(&(&1 != ""))
    |> Enum.drop(2)
    |> Enum.join("/")
  end

  @doc """
  Builds a GET query param string from a Map

  ## Examples

    iex> params = %{ "another" => "yetanother", "link" => "/" }
    iex> CrossroadsInterface.ProxyHelpers.build_param_string(params)
    "?another=yetanother&link=/"
  """
  @spec build_param_string(map) :: String.t 
  def build_param_string(params) do
    param_string = params
                  |> Map.to_list
                  |> Enum.map(fn(p) -> "#{elem(p, 0)}=#{elem(p,1)}" end)
                  |> Enum.join("&")
    "?#{param_string}"
  end

  @doc """
  Match the response appropriatly.
  """
  def match_response(resp) do
    case resp do
      {:ok, %HTTPoison.Response{status_code: 404, body: body}} ->
        {404, "{\"eror\", \"route does not exist\"}"}
      {:ok, %HTTPoison.Response{status_code: status_code, body: body}} -> 
        {status_code, body}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {500, reason}
    end
  end
end
