import os
import zipfile
import shutil

def create_single_folder_zip(source_dir, output_zip, root_folder_name='career-pilot'):
    print(f"Creating ZIP archive with single root folder '{root_folder_name}' -> {output_zip}...")
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Exclude node_modules, .git, dist, and temporary folders
            dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', '.tmp', 'dist')]
            for file in files:
                if file.endswith('.zip'):
                    continue
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, source_dir)
                
                # Prepend the single root folder name
                archive_path = os.path.join(root_folder_name, rel_path).replace('\\', '/')
                zipf.write(file_path, archive_path)
                print(f"  Added: {archive_path}")

    print(f"Successfully generated {output_zip} (Size: {os.path.getsize(output_zip):,} bytes)")

if __name__ == '__main__':
    src = r"C:\Users\HP\.gemini\antigravity-ide\scratch\career-pilot"
    
    out1 = r"C:\Users\HP\.gemini\antigravity-ide\scratch\career-pilot.zip"
    out2 = r"C:\Users\HP\.gemini\antigravity-ide\brain\024e2297-cabb-41ad-9346-d15903f65ef0\career-pilot.zip"
    out3 = r"C:\Users\HP\.gemini\antigravity-ide\scratch\career-pilot\public\career-pilot.zip"
    
    create_single_folder_zip(src, out1, root_folder_name='career-pilot')
    shutil.copy2(out1, out2)
    shutil.copy2(out1, out3)
    print("Copied to brain and public directories.")
