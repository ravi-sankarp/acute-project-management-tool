apiVersion: kind.x-k8s.io/v1alpha4
kind: Cluster
nodes:
  - role: control-plane
  - role: worker
    extraPortMappings:
      - containerPort: 30092 # internal kafka nodeport
        hostPort: 9092 # port exposed on "host" machine for kafka
      - containerPort: 30081 # internal schema-registry nodeport
        hostPort: 8081 # port exposed on "host" machine for schema-registry
    extraMounts:
      - hostPath: ./tmp/kafka-data
        containerPath: /var/lib/kafka/data
        readOnly: false
        selinuxRelabel: false
        propagation: Bidirectional
      - hostPath: ./tmp/zookeeper-data/data
        containerPath: /var/lib/zookeeper/data
        readOnly: false
        selinuxRelabel: false
        propagation: Bidirectional
      - hostPath: ./tmp/zookeeper-data/log
        containerPath: /var/lib/zookeeper/log
        readOnly: false
        selinuxRelabel: false
        propagation: Bidirectional
