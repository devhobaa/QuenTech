import { type User, type InsertUser, type Contact, type InsertContact, type Order, type InsertOrder, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { randomUUID } from "crypto";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  deleteContact(id: string): Promise<boolean>;
  
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  deleteOrder(id: string): Promise<boolean>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private orders: Map<string, Order>;
  private testimonials: Map<string, Testimonial>;
  private dataFile: string;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.orders = new Map();
    this.testimonials = new Map();
    this.dataFile = join(process.cwd(), 'data.json');
    this.loadData();
    this.initializeDefaultTestimonials();
  }

  private loadData() {
    try {
      if (existsSync(this.dataFile)) {
        const data = JSON.parse(readFileSync(this.dataFile, 'utf8'));
        if (data.contacts) {
          this.contacts = new Map(Object.entries(data.contacts));
        }
        if (data.orders) {
          this.orders = new Map(Object.entries(data.orders));
        }
        if (data.users) {
          this.users = new Map(Object.entries(data.users));
        }
        if (data.testimonials) {
          this.testimonials = new Map(Object.entries(data.testimonials));
        }
        console.log('Data loaded from file');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private saveData() {
    try {
      const data = {
        contacts: Object.fromEntries(this.contacts),
        orders: Object.fromEntries(this.orders),
        users: Object.fromEntries(this.users),
        testimonials: Object.fromEntries(this.testimonials),
      };
      writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
      console.log('Data saved to file');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  private initializeDefaultTestimonials() {
    // Only add default testimonials if none exist
    if (this.testimonials.size === 0) {
      const defaultTestimonials = [
        {
          id: randomUUID(),
          name: 'أحمد الراشد',
          role: 'الرئيس التنفيذي، تك كورب',
          text: 'قدمت كوين تك منصة تجارة إلكترونية استثنائية فاقت توقعاتنا. فريقهم محترف وماهر جداً.',
          rating: '5',
          imageUrl: null,
          isActive: 'true',
          createdAt: new Date(),
        },
        {
          id: randomUUID(),
          name: 'Sarah Johnson',
          role: 'Product Manager, EduTech',
          text: 'The educational platform they built for us has transformed how we deliver online courses. Excellent work!',
          rating: '5',
          imageUrl: null,
          isActive: 'true',
          createdAt: new Date(),
        }
      ];

      defaultTestimonials.forEach(testimonial => {
        this.testimonials.set(testimonial.id, testimonial);
      });
      
      this.saveData();
      console.log('Default testimonials initialized');
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    this.saveData();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async deleteContact(id: string): Promise<boolean> {
    if (this.contacts.has(id)) {
      this.contacts.delete(id);
      this.saveData();
      return true;
    }
    return false;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    this.saveData();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async deleteOrder(id: string): Promise<boolean> {
    if (this.orders.has(id)) {
      this.orders.delete(id);
      this.saveData();
      return true;
    }
    return false;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    this.saveData();
    return testimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.isActive === 'true');
  }

  async updateTestimonial(id: string, testimonialData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    if (testimonial) {
      const updatedTestimonial = { ...testimonial, ...testimonialData };
      this.testimonials.set(id, updatedTestimonial);
      this.saveData();
      return updatedTestimonial;
    }
    return undefined;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    if (this.testimonials.has(id)) {
      this.testimonials.delete(id);
      this.saveData();
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();
