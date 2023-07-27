pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm build'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

    }
}