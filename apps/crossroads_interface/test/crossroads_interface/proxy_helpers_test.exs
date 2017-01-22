defmodule CrossroadsInterface.ProxyHelperTest do
  use CrossroadsInterface.ConnCase

  alias ProxyHelpers

  test "strip proxy path from proxy request" do
    request_url = "/proxy/gateway/api/login"
    assert ProxyHelpers.strip_proxy_path(request_url) == "api/login"
  end
end

