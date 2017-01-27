defmodule CrossroadsInterface.ProxyHelperTest do
  use CrossroadsInterface.ConnCase
  doctest CrossroadsInterface.ProxyHelpers

  alias CrossroadsInterface.ProxyHelpers

  test "strip proxy path from proxy request" do
    request_url = "/proxy/gateway/api/login"
    assert ProxyHelpers.strip_proxy_path(request_url) == "api/login"
  end

  test "get params map translate to params string" do
    params = %{"link" => "/", "test" => "value"}
    assert ProxyHelpers.build_param_string(params) == "?link=/&test=value"
  end
end

