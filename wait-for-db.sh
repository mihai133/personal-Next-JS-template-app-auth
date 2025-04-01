#!/bin/bash
until pg_isready -h postgres -p 5432; do
  echo "Waiting for database..."
  sleep 1
done
echo "Database is ready!"
