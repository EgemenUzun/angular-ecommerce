pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Unit Test') {
            steps {
                bat 'npm run test'
            }
        }

        stage('Unit E2E Test') {
            steps {
                bat 'npm run e2e'
            }
        }

    }
}