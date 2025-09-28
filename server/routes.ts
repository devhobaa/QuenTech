import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertOrderSchema, insertTestimonialSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow specific file types
    const allowedTypes = /pdf|doc|docx|txt|zip|rar|png|jpg|jpeg|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, TXT, ZIP, RAR, and image files are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, data: contact });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid contact data" 
      });
    }
  });

  // Order form endpoint with file upload
  app.post("/api/order", upload.single('file'), async (req, res) => {
    try {
      const orderData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        serviceType: req.body.serviceType,
        description: req.body.description,
        fileUrl: req.file ? `/uploads/${req.file.filename}` : null
      };
      
      console.log('Order data with file:', {
        ...orderData,
        fileUrl: orderData.fileUrl,
        fileExists: req.file ? fs.existsSync(path.join(process.cwd(), 'uploads', req.file.filename)) : false
      });
      
      const validatedData = insertOrderSchema.parse(orderData);
      const order = await storage.createOrder(validatedData);
      res.json({ success: true, data: order });
    } catch (error) {
      console.error("Order form error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid order data" 
      });
    }
  });

  // Get contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch contacts" 
      });
    }
  });

  // Delete contact (admin endpoint)
  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const contactId = req.params.id;
      const deleted = await storage.deleteContact(contactId);
      
      if (deleted) {
        res.json({ success: true, message: "Contact deleted successfully" });
      } else {
        res.status(404).json({ 
          success: false, 
          error: "Contact not found" 
        });
      }
    } catch (error) {
      console.error("Delete contact error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to delete contact" 
      });
    }
  });

  // Get orders (admin endpoint)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch orders" 
      });
    }
  });

  // Delete order (admin endpoint)
  app.delete("/api/orders/:id", async (req, res) => {
    try {
      const orderId = req.params.id;
      const deleted = await storage.deleteOrder(orderId);
      
      if (deleted) {
        res.json({ success: true, message: "Order deleted successfully" });
      } else {
        res.status(404).json({ 
          success: false, 
          error: "Order not found" 
        });
      }
    } catch (error) {
      console.error("Delete order error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to delete order" 
      });
    }
  });

  // Test endpoint for file serving
  app.get('/api/test-files', async (req, res) => {
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const files = fs.readdirSync(uploadsDir).filter(file => file !== '.gitignore');
      res.json({ 
        success: true, 
        files: files.map(file => ({
          name: file,
          path: `/uploads/${file}`,
          exists: fs.existsSync(path.join(uploadsDir, file))
        }))
      });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to read uploads directory' });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res, filePath) => {
      // Set appropriate headers for different file types
      const ext = path.extname(filePath).toLowerCase();
      if (['.pdf'].includes(ext)) {
        res.setHeader('Content-Type', 'application/pdf');
      } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        res.setHeader('Content-Type', `image/${ext.slice(1)}`);
      } else if (['.doc', '.docx'].includes(ext)) {
        res.setHeader('Content-Type', 'application/msword');
      } else if (['.txt'].includes(ext)) {
        res.setHeader('Content-Type', 'text/plain');
      } else if (['.zip', '.rar'].includes(ext)) {
        res.setHeader('Content-Type', 'application/zip');
      }
      res.setHeader('Content-Disposition', 'inline');
    }
  }));

  // Testimonials endpoints
  // Get all testimonials (admin)
  app.get("/api/testimonials", async (req, res) => {
    try {
      console.log("Fetching testimonials...");
      const testimonials = await storage.getTestimonials();
      console.log("Testimonials found:", testimonials.length);
      res.json({ success: true, data: testimonials });
    } catch (error) {
      console.error("Get testimonials error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch testimonials" 
      });
    }
  });

  // Get active testimonials (public)
  app.get("/api/testimonials/active", async (req, res) => {
    try {
      console.log("Fetching active testimonials...");
      const testimonials = await storage.getActiveTestimonials();
      console.log("Active testimonials found:", testimonials.length);
      res.json({ success: true, data: testimonials });
    } catch (error) {
      console.error("Get active testimonials error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch testimonials" 
      });
    }
  });

  // Create testimonial (admin)
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, data: testimonial });
    } catch (error) {
      console.error("Create testimonial error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid testimonial data" 
      });
    }
  });

  // Update testimonial (admin)
  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.updateTestimonial(id, req.body);
      if (testimonial) {
        res.json({ success: true, data: testimonial });
      } else {
        res.status(404).json({ 
          success: false, 
          error: "Testimonial not found" 
        });
      }
    } catch (error) {
      console.error("Update testimonial error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Failed to update testimonial" 
      });
    }
  });

  // Delete testimonial (admin)
  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTestimonial(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ 
          success: false, 
          error: "Testimonial not found" 
        });
      }
    } catch (error) {
      console.error("Delete testimonial error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to delete testimonial" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
