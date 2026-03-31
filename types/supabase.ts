export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      about_page_content: {
        Row: {
          id: string
          images: string[] | null
          section: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          images?: string[] | null
          section: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          images?: string[] | null
          section?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "about_page_content_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          content_en: string | null
          content_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          is_published: boolean | null
          meta_description_en: string
          meta_description_id: string
          meta_image: string | null
          meta_title_en: string
          meta_title_id: string
          name_en: string
          name_id: string
          slug: string
          thumbnail: string | null
          title_en: string
          title_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          content_en?: string | null
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          meta_description_en?: string
          meta_description_id?: string
          meta_image?: string | null
          meta_title_en?: string
          meta_title_id?: string
          name_en: string
          name_id: string
          slug: string
          thumbnail?: string | null
          title_en: string
          title_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          content_en?: string | null
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          meta_description_en?: string
          meta_description_id?: string
          meta_image?: string | null
          meta_title_en?: string
          meta_title_id?: string
          name_en?: string
          name_id?: string
          slug?: string
          thumbnail?: string | null
          title_en?: string
          title_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          company_id: string
          created_at: string | null
          featured: boolean | null
          id: string
          image: string | null
          name: string
          order: number
        }
        Insert: {
          company_id: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          name: string
          order?: number
        }
        Update: {
          company_id?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          name?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "brands_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          image: string | null
          link: string | null
          name_en: string
          name_id: string
          order: number
          type: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image?: string | null
          link?: string | null
          name_en: string
          name_id: string
          order?: number
          type: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image?: string | null
          link?: string | null
          name_en?: string
          name_id?: string
          order?: number
          type?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          cover_image: string[] | null
          created_at: string | null
          created_by: string | null
          cta_label_en: string | null
          cta_label_id: string | null
          cta_url: string | null
          description_en: string | null
          description_id: string | null
          full_description_en: string | null
          full_description_id: string | null
          hero_image: string[] | null
          id: string
          initial_name_en: string
          initial_name_id: string
          location_display_type: string | null
          logo: string | null
          meta_description_en: string
          meta_description_id: string
          meta_image: string | null
          meta_title_en: string
          meta_title_id: string
          name_en: string
          name_id: string
          order: number
          slug: string
          strengths_bg_color: string | null
          strengths_bg_image: string | null
          strengths_image: string | null
          thumbnail: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          cover_image?: string[] | null
          created_at?: string | null
          created_by?: string | null
          cta_label_en?: string | null
          cta_label_id?: string | null
          cta_url?: string | null
          description_en?: string | null
          description_id?: string | null
          full_description_en?: string | null
          full_description_id?: string | null
          hero_image?: string[] | null
          id?: string
          initial_name_en: string
          initial_name_id: string
          location_display_type?: string | null
          logo?: string | null
          meta_description_en?: string
          meta_description_id?: string
          meta_image?: string | null
          meta_title_en?: string
          meta_title_id?: string
          name_en: string
          name_id: string
          order?: number
          slug: string
          strengths_bg_color?: string | null
          strengths_bg_image?: string | null
          strengths_image?: string | null
          thumbnail?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          cover_image?: string[] | null
          created_at?: string | null
          created_by?: string | null
          cta_label_en?: string | null
          cta_label_id?: string | null
          cta_url?: string | null
          description_en?: string | null
          description_id?: string | null
          full_description_en?: string | null
          full_description_id?: string | null
          hero_image?: string[] | null
          id?: string
          initial_name_en?: string
          initial_name_id?: string
          location_display_type?: string | null
          logo?: string | null
          meta_description_en?: string
          meta_description_id?: string
          meta_image?: string | null
          meta_title_en?: string
          meta_title_id?: string
          name_en?: string
          name_id?: string
          order?: number
          slug?: string
          strengths_bg_color?: string | null
          strengths_bg_image?: string | null
          strengths_image?: string | null
          thumbnail?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_certifications: {
        Row: {
          certification_id: string
          company_id: string
          created_at: string | null
          id: string
          order: number
        }
        Insert: {
          certification_id: string
          company_id: string
          created_at?: string | null
          id?: string
          order?: number
        }
        Update: {
          certification_id?: string
          company_id?: string
          created_at?: string | null
          id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "company_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_certifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          captcha_score: number | null
          company: string
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string
        }
        Insert: {
          captcha_score?: number | null
          company: string
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone: string
        }
        Update: {
          captcha_score?: number | null
          company?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          id: string
          label_en: string
          label_id: string
          type: string
          updated_at: string | null
          updated_by: string | null
          value: string
        }
        Insert: {
          id?: string
          label_en?: string
          label_id?: string
          type: string
          updated_at?: string | null
          updated_by?: string | null
          value?: string
        }
        Update: {
          id?: string
          label_en?: string
          label_id?: string
          type?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cover_sections: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          images: string[] | null
          order: number
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          order?: number
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "cover_sections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      gmaps_embed_locations: {
        Row: {
          company_id: string
          created_at: string | null
          embed_url: string
          id: string
          name_en: string
          name_id: string
          order: number
        }
        Insert: {
          company_id: string
          created_at?: string | null
          embed_url: string
          id?: string
          name_en: string
          name_id: string
          order?: number
        }
        Update: {
          company_id?: string
          created_at?: string | null
          embed_url?: string
          id?: string
          name_en?: string
          name_id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "gmaps_embed_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_content: {
        Row: {
          id: string
          images: string[] | null
          section: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          images?: string[] | null
          section: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          images?: string[] | null
          section?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homepage_content_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_milestones: {
        Row: {
          company_name_en: string
          company_name_id: string
          created_at: string | null
          description_en: string
          description_id: string
          id: string
          logo: string | null
          order: number
          updated_at: string | null
          updated_by: string | null
          year: string
        }
        Insert: {
          company_name_en?: string
          company_name_id?: string
          created_at?: string | null
          description_en?: string
          description_id?: string
          id?: string
          logo?: string | null
          order?: number
          updated_at?: string | null
          updated_by?: string | null
          year: string
        }
        Update: {
          company_name_en?: string
          company_name_id?: string
          created_at?: string | null
          description_en?: string
          description_id?: string
          id?: string
          logo?: string | null
          order?: number
          updated_at?: string | null
          updated_by?: string | null
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_milestones_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      maps_projection_locations: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          latitude: number
          longitude: number
          name_en: string
          name_id: string
          order: number
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          latitude: number
          longitude: number
          name_en: string
          name_id: string
          order?: number
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name_en?: string
          name_id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "maps_projection_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      page_metadata: {
        Row: {
          id: string
          meta_description_en: string
          meta_description_id: string
          meta_image: string | null
          meta_title_en: string
          meta_title_id: string
          page: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          meta_description_en?: string
          meta_description_id?: string
          meta_image?: string | null
          meta_title_en?: string
          meta_title_id?: string
          page: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          meta_description_en?: string
          meta_description_id?: string
          meta_image?: string | null
          meta_title_en?: string
          meta_title_id?: string
          page?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_metadata_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          image: string | null
          name_en: string
          name_id: string
          order: number
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          image?: string | null
          name_en: string
          name_id: string
          order?: number
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          image?: string | null
          name_en?: string
          name_id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      proven_strengths: {
        Row: {
          company_id: string
          created_at: string | null
          description_en: string | null
          description_id: string | null
          id: string
          order: number
          title_en: string
          title_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          description_en?: string | null
          description_id?: string | null
          id?: string
          order?: number
          title_en: string
          title_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          description_en?: string | null
          description_id?: string | null
          id?: string
          order?: number
          title_en?: string
          title_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proven_strengths_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          allowed_features: Json | null
          allowed_menus: string[] | null
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login_at: string | null
          name: string
          password_hash: string
          role: string
          updated_at: string | null
        }
        Insert: {
          allowed_features?: Json | null
          allowed_menus?: string[] | null
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name: string
          password_hash: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          allowed_features?: Json | null
          allowed_menus?: string[] | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name?: string
          password_hash?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      visit_locations: {
        Row: {
          company_id: string
          created_at: string | null
          display_type: string
          embed_url: string | null
          id: string
          image_url: string | null
          latitude: number | null
          link_url: string | null
          location_en: string | null
          location_id: string | null
          longitude: number | null
          name_en: string
          name_id: string
          order: number
        }
        Insert: {
          company_id: string
          created_at?: string | null
          display_type?: string
          embed_url?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          link_url?: string | null
          location_en?: string | null
          location_id?: string | null
          longitude?: number | null
          name_en: string
          name_id: string
          order?: number
        }
        Update: {
          company_id?: string
          created_at?: string | null
          display_type?: string
          embed_url?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          link_url?: string | null
          location_en?: string | null
          location_id?: string | null
          longitude?: number | null
          name_en?: string
          name_id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "visit_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
