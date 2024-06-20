import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load the data from Excel
df = pd.read_excel('dataset.xlsx', usecols='a,b,c,d,f', header=None)

# Split the data into features and labels
X = df.iloc[:, :-1]
y = df.iloc[:, -1]

# Split the data into training and testing sets
train_size = 0.8
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=train_size, random_state=42)

k = 3
knn = KNeighborsClassifier(n_neighbors=k)

# Train the classifier
knn.fit(X_train, y_train)

# Save the trained model to a file
joblib.dump(knn, 'knn_model.joblib')

# # Initialize variables to store results
# k_values = range(1, 21)  # Testing k from 1 to 20
# accuracies = []

# # Evaluate KNN with different k values
# for k in k_values:
#     knn = KNeighborsClassifier(n_neighbors=k)
#     knn.fit(X_train, y_train)
#     y_pred = knn.predict(X_test)
#     accuracy = accuracy_score(y_test, y_pred)
#     accuracies.append(accuracy)
#     print(f'k = {k}, Accuracy = {accuracy:.2f}')

# # Plot the results
# plt.figure(figsize=(10, 6))
# plt.plot(k_values, accuracies, marker='o', linestyle='-', color='b')
# plt.title('KNN Accuracy for different k values')
# plt.xlabel('Number of Neighbors (k)')
# plt.ylabel('Accuracy')
# plt.xticks(k_values)
# plt.grid(True)
# plt.show()