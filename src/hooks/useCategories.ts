import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { Category, CategoryFormData } from '@/types/category';

export function useCategories(isActive?: boolean) {
  return useQuery({
    queryKey: ['categories', isActive],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (isActive !== undefined) params.append('isActive', isActive.toString());
      
      const response = await apiClient.get<{ categories: Category[] }>(
        `/api/categories?${params.toString()}`
      );
      
      return response.data?.categories || [];
    },
  });
}

export function useCategory(categoryId: string) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const response = await apiClient.get<Category>(`/api/categories/${categoryId}`);
      return response.data;
    },
    enabled: !!categoryId,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CategoryFormData) => {
      const response = await apiClient.post<Category>('/api/categories', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory(categoryId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<CategoryFormData>) => {
      const response = await apiClient.put<Category>(`/api/categories/${categoryId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', categoryId] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await apiClient.delete(`/api/categories/${categoryId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}


