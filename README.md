React Native Restaurant Reservation API

1)Download the files into a folder called " Restaurant-reservation-api "

2)Μετά την κλωνοποίηση του project, μεταβείτε στον φάκελο: restaurant-reservation-api/.env

Ανοίξτε το αρχείο .env και προσαρμόστε τις τιμές με βάση το δικό σας σύστημα:
Τη δική σας IP (για πρόσβαση από άλλες συσκευές στο τοπικό δίκτυο)
Τα στοιχεία της βάσης δεδομένων (user, password, κ.λπ.)

3) Μεταβείτε στο αρχείο: restaurant-reservation-api/models/db.js
   βεβαιωθείτε ότι το port είναι σωστά ρυθμισμένο.

4)Ο φάκελος restaurant-reservation-api/models/ περιέχει το script setupDB.js, 
το οποίο δημιουργεί τη βάση και τους πίνακες.Ανοίξτε το τερματικό και τρέξτε:
cd restaurant-reservation-api/models
node setupDB.js

5) Για να λειτουργεί η εφαρμογή σωστά σε διαφορετική συσκευή 
    θα πρέπει και το backend και το frontend να δείχνουν στη σωστήτοπική IP διεύθυνση του υπολογιστή σας.
Βεβαιωθείτε ότι και ο υπολογιστής και το κινητό είναι συνδεδεμένα στο ίδιο Wi-Fi δίκτυο.
Βρείτε τη τοπική IP του υπολογιστή σας:
Αντικαταστήστε όλες τις εμφανίσεις της IP (π.χ. 192.168.137.106) με τη δική σας IP.

Aρχεία που πρέπει να ενημερωθούν
Backend (Node.js):
Στον φάκελο restaurant-reservation-api/, αλλάξτε την IP στα εξής αρχεία:
app.js
upload.js
Εκεί όπου βλέπετε http://192.168.xxx.xxx:3000, αλλάξτε το με τη δική σας IP.

Frontend (React Native):
Στον φάκελο restaurant-app-frontend/app/drawer/, τροποποιήστε τα εξής αρχεία:
adminUser.tsx
adminReservations.tsx
adminMenu.tsx
register.tsx
profile.tsx
login.tsx
index.tsx
[id].tsx

6)Εκκίνηση Backend (API Server)
Ανοίξτε το terminal και πλοηγηθείτε στον φάκελο:restaurant-reservation-api
Έπειτα, τρέξτε: node app.js

Εκκίνηση Frontend (React Native App)
Σε νέο terminal, πλοηγηθείτε στον φάκελο:
restaurant-app-frontend
και τρέξτε: npm start

7) Scan QR code with Expo go
