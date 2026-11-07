-- CocoTube: execute este arquivo no SQL Editor do seu projeto Supabase.
-- Cria metadados de Shorts e bucket de vídeos com políticas por usuário.

create table if not exists public.shorts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  caption text not null default '' check (char_length(caption) <= 90),
  video_path text not null unique,
  status text not null default 'published' check (status in ('published','unlisted')),
  created_at timestamptz not null default now()
);

alter table public.shorts enable row level security;

drop policy if exists "Published shorts are visible to everyone" on public.shorts;
create policy "Published shorts are visible to everyone"
on public.shorts for select to anon, authenticated
using (status = 'published' or (select auth.uid()) = user_id);

drop policy if exists "Users can publish their own shorts" on public.shorts;
create policy "Users can publish their own shorts"
on public.shorts for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own shorts" on public.shorts;
create policy "Users can update their own shorts"
on public.shorts for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own shorts" on public.shorts;
create policy "Users can delete their own shorts"
on public.shorts for delete to authenticated
using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('shorts', 'shorts', true, 157286400, array['video/webm','video/mp4','video/quicktime'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view published short files" on storage.objects;
create policy "Public can view published short files"
on storage.objects for select to anon, authenticated
using (bucket_id = 'shorts');

drop policy if exists "Users upload shorts into their own folder" on storage.objects;
create policy "Users upload shorts into their own folder"
on storage.objects for insert to authenticated
with check (bucket_id = 'shorts' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users update their own short files" on storage.objects;
create policy "Users update their own short files"
on storage.objects for update to authenticated
using (bucket_id = 'shorts' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'shorts' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users delete their own short files" on storage.objects;
create policy "Users delete their own short files"
on storage.objects for delete to authenticated
using (bucket_id = 'shorts' and (storage.foldername(name))[1] = (select auth.uid())::text);

grant select, insert, update, delete on public.shorts to authenticated;
grant select on public.shorts to anon;
