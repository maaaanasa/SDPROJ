pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('TASKMANAGER-REACT') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\reacttaskmanager" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\reacttaskmanager"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\reacttaskmanager"
                xcopy /E /I /Y TASKMANAGER-REACT\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\reacttaskmanager"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('TASKMANAGER-SPRINGBOOT') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\springboottaskapi.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\springboottaskapi.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\springboottaskapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\springboottaskapi"
                )
                copy "TASKMANAGER-SPRINGBOOT\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat10.1\\webapps\\"
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
