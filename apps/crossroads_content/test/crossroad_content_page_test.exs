defmodule CrossroadsContentPagesTest do
  use ExUnit.Case, async: true
  doctest CrossroadsContent.Pages

  alias CrossroadsContent.Pages

  test "get site config returns a 404 response" do
    {result, status, _body} =  Pages.get_site_config(12)
    assert status == 404
    assert result == :error
  end

  test "get site config returns an error" do
    {result, status, _body} = Pages.get_site_config(500)
    assert status == 500
    assert result == :error
  end

  test "get site config returns valid value" do
    {result, status, body} = Pages.get_site_config(1)
    assert status == 200
    assert result == :ok
    assert body["siteConfig"]["id"] == 1
  end

  test "get content blocks" do
    {result, status, body} = Pages.get_content_blocks
    assert status == 200
    assert result == :ok
    contentBlocks = body["contentBlocks"]
    assert Enum.at(contentBlocks, 0)["id"] == 1
  end

  test "get systempage for state" do
    {result, status, body} = Pages.get_system_page("login")
    assert status == 200
    assert result == :ok
    systemPage = body["systemPages"]
    assert Enum.at(systemPage, 0)["id"] == 57
  end

  test "get page with stage parameter" do
    {result, status, body} = Pages.get_page("/habitat/", true)
    assert status == 200
    assert result = :ok
    page = Enum.at(body["pages"], 0)
    assert page["id"] == 268
  end

  test "get page with no stage parameter" do
    {result, status, body} = Pages.get_page("/habitat/", false)
    assert status == 200
    assert result = :ok
    page = Enum.at(body["pages"], 0)
    assert page["id"] == 268

  end
end
