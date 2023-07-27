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