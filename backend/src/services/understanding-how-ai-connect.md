# 🚀 AI Interview Report Generator Notes

---

# 📦 IMPORTS

```js
// Gemini AI SDK import
// AI model ko call karne ke liye use hota hai
const { GoogleGenAI } = require("@google/genai");

// Zod validation library
// Response validate karne ke liye use hoti hai
const { z } = require("zod");

// Zod schema ko JSON schema me convert karta hai
const { zodToJsonSchema } = require("zod-to-json-schema");
```

---

# 🛡️ ZOD SCHEMA

```js
const interviewReportSchema = z.object({...});
```

✅ Ye validation schema hai.

### Kaam:

* AI response validate karta hai
* Check karta hai:

  * field missing toh nahi
  * datatype sahi hai ya nahi
  * arrays/object correct hain ya nahi

---

# 📄 RESPONSE SCHEMA

```js
const responseSchema = {...};
```

✅ Ye Gemini AI ko response structure samjhata hai.

### Kaam:

* AI ko batata hai:

  * JSON format kaisa hoga
  * kaunse fields honge
  * arrays me objects honge

---

# 🔑 GEMINI API SETUP

```js
const api = new GoogleGenAI({
   apiKey: process.env.GOOGLE_GENAI_API_KEY,
});
```

✅ Gemini API initialize hoti hai using API key.

---

# ⚡ MAIN FUNCTION

```js
async function generateInterviewReport({...})
```

✅ Main function ka kaam:

1. Prompt banana
2. Gemini ko request bhejna
3. Response validate karna
4. Final data return karna

---

# 🧠 PROMPT

```js
const prompt = `...`
```

✅ AI ko instructions diye jaate hain.

### Example:

* ONLY JSON return karo
* markdown mat do
* arrays me objects do
* flatten arrays mat do

---

# 🤖 GEMINI API CALL

```js
const response =
   await api.models.generateContent({...})
```

✅ Actual AI request yahan hoti hai.

---

# ⚙️ CONFIG

```js
config:{
   responseMimeType:"application/json",
   responseJsonSchema: responseSchema
}
```

## 📌 responseMimeType

```js
responseMimeType:"application/json"
```

✅ AI ko bolta hai:

> JSON format me response do

---

## 📌 responseJsonSchema

```js
responseJsonSchema: responseSchema
```

✅ AI ko exact response structure batata hai.

---

# 🔄 JSON PARSE

```js
JSON.parse(response.text)
```

✅ AI string return karta hai.

Example:

```txt
"{ \"matchScore\":90 }"
```

`JSON.parse()` us string ko JavaScript object me convert karta hai.

---

# ✅ ZOD VALIDATION

```js
interviewReportSchema.parse(jsonData)
```

✅ Final safety check.

### Check karta hai:

* structure correct hai ya nahi
* datatype correct hai ya nahi
* arrays/object valid hain ya nahi

❌ Agar galat hua toh error throw karega.

---

# 📤 RETURN RESULT

```js
return result;
```

✅ Clean validated data return hota hai.

---

# ❌ ERROR HANDLING

```js
catch(error)
```

✅ Errors handle karta hai.

### Example:

* API quota exceed
* invalid JSON
* validation error
* Gemini error

---

# 🚫 RATE LIMIT ERROR

```js
if(error.status === 429)
```

✅ API limit exceed hone par message print karta hai.

---

# 📚 COMPLETE FLOW

```txt
User Request
   ↓
PDF Upload
   ↓
Resume Extract
   ↓
Prompt Build
   ↓
Gemini API
   ↓
JSON Response
   ↓
JSON.parse()
   ↓
Zod Validation
   ↓
MongoDB Save
   ↓
Frontend Response
```

---

# 🎯 FINAL RESULT

✅ Structured AI response
✅ Validated JSON
✅ MongoDB ready data
✅ Production-style backend flow 🚀
