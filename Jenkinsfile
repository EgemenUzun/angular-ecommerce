pipeline {
    agent any
    
    options { 
        ansiColor('xterm')
    }
    
    environment {
        LC_ALL = 'en_US.UTF-8'
        LANG    = 'en_US.UTF-8'
        LANGUAGE = 'en_US.UTF-8'
    }

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

        stage('Serve Web Socket') {
            steps {
                bat 'start node src/Index.js'
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