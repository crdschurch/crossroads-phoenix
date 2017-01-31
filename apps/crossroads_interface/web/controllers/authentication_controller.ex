defmodule CrossroadsInterface.AuthenticationController do
  use CrossroadsInterface.Web, :controller

  require IEx

  CrossroadsInterface.Plug.BaseHref

  def login(conn, %{"login" => login_params} = params) do
    referer = get_referer(conn.req_headers)
    # are the parameters sent correct?
    # try to login...
    errors = [username: "username cannot be empty", password: "password cannot be emtpy"]
    #if redirect is set, redirect to there
    # else send back to the place requested
    case referer do
      {:ok, ref} -> render conn, "login.html", errors: errors
      {:error, _} -> render conn, "login.html", errors: errors
    end
  end


  def get_referer(headers) do
    case Enum.find(headers, &match_referer/1) do
      {"referer", ref} -> {:ok, ref}
      _ -> {:error, "referer not found"}
    end
  end

  def login_form_errors(%{"username" => ""} = params) do
    # both parameters are emtpy...
   [username: "username cannot be empty", password: "password cannot be emtpy"]
  end

  def match_referer({"referer", ref}), do: true
  def match_referer(headers), do: false

end
