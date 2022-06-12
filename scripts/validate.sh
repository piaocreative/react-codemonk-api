#!/bin/bash
 sleep 10
 result=$(curl -sL -w "%{http_code}\\n" "http://localhost:3000/" -o /dev/null)
 if [ "$result" = "200" ]; then
     exit 0
 else
     exit 1
 fi
