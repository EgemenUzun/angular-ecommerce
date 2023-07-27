pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
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

        stage('Serve Angular') {
            steps {
                bat 'npm start'
            }
        }

        stage('Unit E2E Test') {
            steps {
                bat 'npm run e2e'
            }
        }

    }
}