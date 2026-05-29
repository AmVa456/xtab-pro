use tauri::command;
use std::path::Path;
use std::fs;

/// Get the current working directory
#[command]
pub fn get_cwd() -> Result<String, String> {
    std::env::current_dir()
        .map(|p| p.to_string_lossy().to_string())
        .map_err(|e| e.to_string())
}

/// Read file contents
#[command]
pub fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path)
        .map_err(|e| e.to_string())
}

/// Write file contents
#[command]
pub fn write_file(path: String, contents: String) -> Result<(), String> {
    fs::write(&path, contents)
        .map_err(|e| e.to_string())
}

/// List directory contents
#[command]
pub fn list_dir(path: String) -> Result<Vec<String>, String> {
    fs::read_dir(&path)
        .map_err(|e| e.to_string())?
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                e.file_name().into_string().ok()
            })
        })
        .collect::<Vec<_>>()
        .into()
}
