apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    service: schema-registry
  name: schema-registry-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      service: schema-registry
  strategy: {}
  template:
    metadata:
      labels:
        network/kafka-network: "true"
        service: schema-registry
    spec:
      enableServiceLinks: false
      containers:
        - env:
            - name: SCHEMA_REGISTRY_HOST_NAME
              value: "schema-registry"
            - name: SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS
              value: "kafka-srv:29092"
            - name: SCHEMA_REGISTRY_LISTENERS
              value: "http://0.0.0.0:30081"
          image: confluentinc/cp-schema-registry:7.0.1
          name: schema-registry
          ports:
            - containerPort: 30081
          resources: {}
      hostname: schema-registry
      restartPolicy: Always
