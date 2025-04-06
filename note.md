##  PRIVATE NOTE

- During test works well overall.
### ❗ Issues:
- If I'm on the notes dashboard, open a note, and then either delete it or save it as empty, the entire interface disappears, including the view of the current question. Nothing is visible in the practice/notes section until the page is refreshed.

---

## 📁 COLLECTIONS

- Creating a new collection correctly adds it to Firebase instantly.
- Adding or removing questions from it also updates in Firebase.

### ❗ Issues:

- On the frontend, the icon below the question does **not** show that the question has been added to the new collection (even though it’s visible from the slide-in collection manager on the left).
- When starting a new test, the question still does **not** appear as part of any collection, and the newly created collection disappears from the collection tab.
- After refreshing the page, everything displays correctly — both the question's collection status and the collection itself.

✅ **Expected behavior:**  
It should work like before – So basically everz change should be stored on frontend like before. Collections and question status should update immediately on the frontend and persist locally. When starting a new test, the new collections should be visible, and questions should properly reflect their inclusion via icons.

---

## 💬 COMMENTS

**Firebase structure requirement:**  
All user comments should be stored in a **single document inside the `usersCommentsBank` collection**.  
Do **not** create individual documents for each question. Comment volume will likely remain small, so the 1MB document limit won’t be an issue.

### ❗ Issues:

- When a comment is added, the icon below the question does not update to reflect that it has one.
- Restarting a test doesn’t show the comment icon, though the comment tab displays the comment correctly.
- After refreshing the browser and returning to the same question, the comment disappears.
- If another user comments on the same question, it **overwrites** the previous comments for that question.
- Public comments are saved correctly, **but cannot be edited or deleted** because the “…” menu does not appear.
- Reply, like, and dislike functionalities are missing.

🚫 **Public comments dashboard is not working.**

---

## 🧪 TEST RESULT SAVING

- Currently not working — assumed to be not yet implemented.
