const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH connection established successfully.');
  
  const cmd = `
    echo "=== Kubernetes Nodes ===" && kubectl get nodes -o wide
    echo "=== Kubernetes Namespaces ===" && kubectl get namespaces
    echo "=== Kubernetes Pods (All Namespaces) ===" && kubectl get pods -A
    echo "=== Kubernetes Ingresses (All Namespaces) ===" && kubectl get ingress -A
    echo "=== Kubernetes Services (All Namespaces) ===" && kubectl get svc -A
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}).connect({
  host: '178.238.233.205',
  port: 22,
  username: 'root',
  password: '1f2r3a4N'
});
