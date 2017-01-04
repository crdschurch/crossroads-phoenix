defmodule CrossroadsContent.Pages do
  @moduledoc """
    Handles getting all content from the CMS
  """
  use GenServer

  require Logger

  @base_url Application.get_env(:crossroads_content, :content_server, "https://contentint.crossroads.net")
  @http Application.get_env(:crossroads_content, :http)

  @doc """

  """
  @spec get_site_config(number) :: {:ok | :error, number, map}
  def get_site_config(id) do
    GenServer.call(__MODULE__, {:site_config, id})
  end

  @spec get_content_blocks :: {:ok | :error, number, map}
  def get_content_blocks do
    GenServer.call(__MODULE__, {:content_blocks})
  end

  @spec get_system_page(String.t) :: {:ok | :error, number, map}
  def get_system_page(state_name) do
    GenServer.call(__MODULE__, {:system_page, state_name})
  end

  @spec get_page(String.t, boolean) :: {:ok | :error, number, map}
  def get_page(url, stage) do
    GenServer.call(__MODULE__, {:page, url, stage})
  end

  @doc false
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  @doc false
  def init(:ok) do
    {:ok, %{}}
  end

  @doc false
  def handle_call({:site_config, id},_from, state) do
    path = "SiteConfig/#{id}"
    make_call(path, state)
  end

  @doc false
  def handle_call({:content_blocks}, _from, state) do
    path = "ContentBlock"
    make_call(path, state)
  end

  @doc false
  def handle_call({:system_page, state_name}, _from, state) do
    path = "SystemPage/?StateName=#{state_name}"
    make_call(path, state)
  end

  @doc false
  def handle_call({:page, url, true}, _from, state) do
    path = "Page/?link=#{url}&stage=Stage"
    make_call(path, state)
  end

  @doc false
  def handle_call({:page, url, false}, _from, state) do
    path = "Page/?link=#{url}"
    make_call(path, state)
  end

  @doc false
  defp make_call(path, state) do
    response = case @http.get("#{@base_url}/api/#{path}") do
      {:ok, %HTTPoison.Response{status_code: 404, body: body}} ->
        {:error, 404, Poison.decode!(body)}
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, 200, Poison.decode!(body)}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, 500, %{error: reason}}
      {_, _} ->
        {:error, 0, %{error: "unknown response"}}
    end
    {:reply, response, state}
  end
end
