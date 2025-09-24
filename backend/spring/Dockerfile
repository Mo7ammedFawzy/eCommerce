FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy project
COPY . .

# Build JAR (Maven)
RUN ./mvnw package -DskipTests

EXPOSE 8081
CMD ["java", "-Xms128m", "-Xmx256m", "-jar", "target/*.jar"]
