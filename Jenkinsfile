pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'ng build'
            }
        }
        stage('Test') {
            steps {
                bat 'ng test'
            }
        }

    }
}