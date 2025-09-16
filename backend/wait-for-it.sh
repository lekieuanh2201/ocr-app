#!/bin/sh
# wait-for-it.sh: wait until a host and port are available
# Usage: wait-for-it.sh host:port -- command args

set -e

host="$1"
shift

until nc -z $(echo $host | cut -d: -f1) $(echo $host | cut -d: -f2); do
  echo "Waiting for $host..."
  sleep 2
 done
exec "$@"
