FROM ubuntu:latest
LABEL authors="Mohammed Fawzy"

ENTRYPOINT ["top", "-b"]

FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy your Spring Boot project
COPY . .

# Build the JAR using Maven
RUN ./mvnw package -DskipTests

# Run the JAR
EXPOSE 8081
CMD ["java", "-Xms128m", "-Xmx256m", "-jar", "target/*.jar"]
