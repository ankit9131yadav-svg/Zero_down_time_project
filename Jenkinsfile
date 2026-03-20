pipeline {
    agent any

    environment {
        IMAGE = "devops-app"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url:'https://github.com/ankit9131yadav-svg/Zero_down_time_project.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Deploy Green') {
            steps {
                sh '''
                docker rm -f green || true
                docker run -d -p 3002:3000 --name green $IMAGE
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh 'curl -f http://localhost:3002'
            }
        }

        stage('Switch Traffic') {
            steps {
                sh '''
                sudo sed -i 's/3001/3002/' /etc/nginx/nginx.conf
                sudo systemctl reload nginx
                '''
            }
        }

        stage('Cleanup Blue') {
            steps {
                sh 'docker rm -f blue || true'
            }
        }

        stage('Deploy New Blue') {
            steps {
                sh '''
                docker run -d -p 3001:3000 --name blue $IMAGE
                '''
            }
        }
    }
}
