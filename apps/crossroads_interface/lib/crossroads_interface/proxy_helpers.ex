defmodule ProxyHelpers do

  def strip_proxy_path(path) do
    path
    |> String.split("/")
    |> Enum.filter(&(&1 != ""))
    |> Enum.drop(2)
    |> Enum.join("/")
  end
end
