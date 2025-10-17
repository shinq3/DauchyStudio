import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { z } from "zod";
import type { News, InsertNews } from "@shared/schema";

const formSchema = insertNewsSchema.omit({ authorId: true }).extend({
  publishedAt: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface NewsEditorProps {
  news?: News;
  onSave: (data: InsertNews) => void;
  isLoading?: boolean;
}

export default function NewsEditor({ news, onSave, isLoading }: NewsEditorProps) {
  const [content, setContent] = useState(news?.content || "");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: news?.title || "",
      excerpt: news?.excerpt || "",
      content: news?.content || "",
      category: news?.category || "company",
      status: news?.status || "draft",
      featuredImage: news?.featuredImage || "",
      externalUrl: news?.externalUrl || "",
      sourceUrl: news?.sourceUrl || "",
      sourceAttribution: news?.sourceAttribution || "",
      isExternal: news?.isExternal || false,
      publishedAt: news?.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : "",
    },
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header", "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "link", "image"
  ];

  const handleSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form errors:', form.formState.errors);
    
    const submitData: any = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content,
      category: data.category,
      tags: data.tags,
      featuredImage: data.featuredImage,
      isExternal: data.isExternal,
      externalUrl: data.externalUrl,
      sourceUrl: data.sourceUrl,
      sourceAttribution: data.sourceAttribution,
      status: data.status,
      publishedAt: data.publishedAt && data.status === "published" 
        ? new Date(data.publishedAt) 
        : data.status === "published" 
          ? new Date() 
          : undefined,
    };

    console.log('Calling onSave with:', submitData);
    onSave(submitData);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter news title"
                          data-testid="input-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          value={field.value || ""}
                          placeholder="Brief description of the news"
                          rows={3}
                          data-testid="input-excerpt"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          value={field.value || ""}
                          placeholder="https://example.com/image.jpg"
                          data-testid="input-thumbnail"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source URL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          value={field.value || ""}
                          placeholder="https://external-source.com"
                          data-testid="input-source-url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceAttribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Attribution</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          value={field.value || ""}
                          placeholder="Source name or attribution"
                          data-testid="input-source-attribution"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish Date</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="datetime-local"
                          data-testid="input-publish-date"
                        />
                      </FormControl>
                      <FormDescription>
                        Leave empty to use current time when publishing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isExternal"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Internal News</FormLabel>
                        <FormDescription>
                          Only visible to admins and internal users
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-internal"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Content</Label>
                <div className="min-h-[300px] border rounded-md">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    style={{ height: "280px" }}
                    data-testid="editor-content"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => {
                console.log('=== FORM DEBUG INFO ===');
                console.log('Form values:', form.getValues());
                console.log('Form errors:', form.formState.errors);
                console.log('Form is valid:', form.formState.isValid);
                console.log('Content state:', content);
              }}
            >
              Debug Form
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              data-testid="button-save"
            >
              {isLoading ? "Saving..." : news ? "Update News" : "Create News"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}