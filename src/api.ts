const API_BASE = 'http://localhost:3001';

function getToken(): string | null {
  return localStorage.getItem('adminToken');
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem('adminToken', token);
  else localStorage.removeItem('adminToken');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export async function apiLogin(email: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

// Helper to provide standard auth header
function getAuthHeader(): HeadersInit {
  return { 'Authorization': `Bearer ${getToken()}` };
}

// ==========================================
//                FACULTY API
// ==========================================

export async function getFaculty(): Promise<FacultyMember[]> {
  const res = await fetch(`${API_BASE}/api/faculty`);
  if (!res.ok) throw new Error('Failed to fetch faculty');
  return res.json();
}

export async function createFaculty(formData: FormData): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/faculty`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData, 
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to create faculty');
  return data;
}

export async function updateFaculty(id: number, formData: FormData): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/faculty/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to update faculty');
  return data;
}

export async function deleteFaculty(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/admin/faculty/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete faculty');
}

// ==========================================
//                STUDENTS API 
// ==========================================

export async function getStudents(): Promise<Student[]> {
  const res = await fetch(`${API_BASE}/api/student`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function createStudent(formData: FormData): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/student`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to create student');
  return data;
}

export async function updateStudent(id: number, formData: FormData): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/student/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to update student');
  return data;
}

export async function deleteStudent(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/admin/student/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete student');
}


// ==========================================
//                EVENTS API
// ==========================================

export async function getEvents(): Promise<{ upcoming: EventUpcoming[]; past: EventPast[] }> {
  const res = await fetch(`${API_BASE}/api/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function createEvent(formData: FormData): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/events`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to create event');
  return data;
}

export async function updateEvent(id: number, formData: FormData): Promise<any> {
  const res = await fetch(`${API_BASE}/api/admin/events/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to update event');
  return data;
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/admin/events/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete event');
}

// ==========================================
//                NEWS API
// ==========================================

export async function getNews(): Promise<{id: number, text: string}[]> {
  const res = await fetch(`${API_BASE}/api/news`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function createNews(data: { text: string }): Promise<any> {
  const res = await fetch(`${API_BASE}/api/news`, {
    method: 'POST',
    headers: {
      ...getAuthHeader() as Record<string, string>,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create news');
  return res.json();
}

export async function deleteNews(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/news/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete news');
}

// ==========================================
//                TYPES
// ==========================================

export type FacultyMember = {
  id?: number;
  name: string;
  position: string;
  education: string;
  research: string[];
  email: string;
  phone?: string;
  office?: string;
  homePage?: string;
  publications?: number | string;
  experience?: string;
  image: string;
  category: string;
};

export type Student = {
  id?: number;
  name: string;
  designation: string; 
  homePageURL?: string; 
  email: string;
  phone?: string;
  addressLocation?: string; 
  role: 'UG' | 'PHD'; 
  order?: number; 
  image: string;
};

export type EventUpcoming = {
  id?: number;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type?: string;
  description?: string;
  registrations?: number;
  maxCapacity?: number;
  status?: string;
  color?: string;
  eventType: 'upcoming';
};

export type EventPast = {
  id?: number;
  title: string;
  date: string;
  description?: string;
  participants?: number;
  image?: string;
  eventType: 'past';
};