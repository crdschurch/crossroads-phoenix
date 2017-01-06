defmodule CrossroadsInterface.SharedView do
  use CrossroadsInterface.Web, :view

  @spec filter_content_blocks([map], String.t, map) :: map
  def filter_content_blocks(blocks, key, default \\ %{ content: ""}) do
    Enum.find(blocks, default, fn(b) -> b["title"] == key end)
  end
end
