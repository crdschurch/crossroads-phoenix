#!/bin/sh
set -e

# link from /microclients to crossroads-phoenix/apps/crossroads_interface/priv/static/js
rm -rf /crossroads-phoenix/apps/crossroads_interface/priv/static/js
ln -s /microclients /crossroads-phoenix/apps/crossroads_interface/priv/static/js

# install depdencies
cd /crossroads-phoenix/apps/crossroads_interface
mix deps.get

exec "$@"