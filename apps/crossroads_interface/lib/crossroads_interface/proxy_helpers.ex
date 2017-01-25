defmodule CrossroadsInterface.ProxyHelpers do
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
  Match the response appropriatly.
  """
  def match_response(resp) do
    case resp do
      {:ok, %HTTPoison.Response{status_code: status_code, body: body}} -> 
        {status_code, body}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {500, reason}
    end
  end
end