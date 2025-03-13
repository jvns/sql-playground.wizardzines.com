set -eux
rm -f static/db.sqlite
sqlite3 static/db.sqlite < databases/import.sql
