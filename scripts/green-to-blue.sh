#!/bin/bash
kubectl apply -f green-deployment.yaml
kubectl set image deployment/aggregator-service-green aggregator-service=ranaliw/aggregator-service:${GITHUB_SHA} --record
