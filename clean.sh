#!/bin/bash

dkc="docker-compose"

rm ./results/*.html
$dkc stop
$dkc down --remove-orphans
$dkc rm -fsv
