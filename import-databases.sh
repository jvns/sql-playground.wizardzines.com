set -eux
rm -f public/db.sqlite
sqlite3 public/db.sqlite < databases/import.sql
