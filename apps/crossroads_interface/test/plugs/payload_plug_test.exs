defmodule CrossroadsInterface.Plug.PayloadTest do
  use CrossroadsInterface.ConnCase

  test "Assigns :payload when Payload.call() is called", %{conn: conn} do
    conn = conn() |> CrossroadsInterface.Plug.Payload.call([])
    assert conn.assigns.payload == []
  end

  test "Assigns :payload to empty string when Payload.call() is called and default parameter is nil", %{conn: conn} do
    conn = conn() |> CrossroadsInterface.Plug.Payload.call(nil)
    assert conn.assigns.payload == ""
  end
end
