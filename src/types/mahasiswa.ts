// src/types/mahasiswa.ts
export interface Mahasiswa {
  NIM: string;
  Name: string;
  Gender: 'L' | 'P';
  BirthDate: string; // Format: YYYY-MM-DD
  Address: string;
  Contact: string;
  Status: boolean;
}