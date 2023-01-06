#!/bin/bash

docker build -t acutereg.azurecr.io/auth auth/.

docker build -t acutereg.azurecr.io/project project/.


docker push acutereg.azurecr.io/project 
docker push acutereg.azurecr.io/auth

kubectl rollout restart deployment auth-depl project-depl