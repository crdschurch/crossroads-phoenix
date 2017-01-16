defmodule CrossroadsInterface.TripControllerTest do
  use CrossroadsInterface.ConnCase

  alias CrossroadsInterface.Trip
  @valid_attrs %{}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, trip_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing trips"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, trip_path(conn, :new)
    assert html_response(conn, 200) =~ "New trip"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, trip_path(conn, :create), trip: @valid_attrs
    assert redirected_to(conn) == trip_path(conn, :index)
    assert Repo.get_by(Trip, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, trip_path(conn, :create), trip: @invalid_attrs
    assert html_response(conn, 200) =~ "New trip"
  end

  test "shows chosen resource", %{conn: conn} do
    trip = Repo.insert! %Trip{}
    conn = get conn, trip_path(conn, :show, trip)
    assert html_response(conn, 200) =~ "Show trip"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, trip_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    trip = Repo.insert! %Trip{}
    conn = get conn, trip_path(conn, :edit, trip)
    assert html_response(conn, 200) =~ "Edit trip"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    trip = Repo.insert! %Trip{}
    conn = put conn, trip_path(conn, :update, trip), trip: @valid_attrs
    assert redirected_to(conn) == trip_path(conn, :show, trip)
    assert Repo.get_by(Trip, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    trip = Repo.insert! %Trip{}
    conn = put conn, trip_path(conn, :update, trip), trip: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit trip"
  end

  test "deletes chosen resource", %{conn: conn} do
    trip = Repo.insert! %Trip{}
    conn = delete conn, trip_path(conn, :delete, trip)
    assert redirected_to(conn) == trip_path(conn, :index)
    refute Repo.get(Trip, trip.id)
  end
end
