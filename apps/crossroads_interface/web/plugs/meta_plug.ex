defmodule CrossroadsInterface.Plug.Meta do
  require IEx
  import Plug.Conn
  alias CrossroadsContent.Pages

  def init(default), do: default

  def call(conn, _default) do
    # remove beginning and  trailing slashes from the request_path
    path =   conn.request_path
             |> String.split("/")
             |> Enum.filter(&(&1 != ""))
             |> Enum.join(".")
    system_page = Pages.get_system_page(path) |> match_system_pages
    site_config = Pages.get_site_config(1) |> match_site_config
    conn
    |> assign(:meta_description, Map.get(system_page, "description", "Crossroads Church"))
    |> assign(:meta_title, Map.get(system_page, "title", "Crossroads"))
    |> assign(:meta_url, Map.get(system_page, "uRL", "/"))
    |> assign(:meta_type, Map.get(system_page, "type", "website"))
    |> assign(:meta_image, find_image(system_page))
    |> assign(:meta_card, Map.get(system_page, "card"))
    |> assign(:meta_siteconfig_title, Map.get(site_config, "title", "Crossroads"))
    |> assign(:meta_siteconfig_locale, Map.get(site_config, "locale", "en_US"))
    |> assign(:meta_siteconfig_facebook, Map.get(site_config, "facebook", ""))
    |> assign(:meta_siteconfig_twitter, Map.get(site_config, "twitter", ""))
  end

  defp find_image(%{"image" => image}) do
    Map.get(image, "filename", "")
  end

  defp find_image(no_image) do
    ""
  end

  defp match_system_pages({:ok, resp_code, body}) do
    body
    |> Map.get("systemPages", [])
    |> List.first
  end

  defp match_system_pages({:error, resp_code, body}) do
    %{}
  end

  defp match_site_config({:ok, resp_code, body}) do
    body
    |> Map.get("siteConfig", %{})
  end

  defp match_site_config({:ok, resp_code, body}) do
    %{}
  end
end
