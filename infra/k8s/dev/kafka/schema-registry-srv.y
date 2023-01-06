apiVersion: v1
kind: Service
metadata:
  labels:
    service: schema-registry
  name: schema-registry-srv
spec:
  ports:
    - port: 30081
      name: outport
      targetPort: 30081
      nodePort: 30081
  type: NodePort
  selector:
    service: schema-registry
