
def file_directory_path(instance, filename):
    """Формируем путь медиа файла"""
    # файл будет загружен в MEDIA_ROOT/user_<id>/<filename>
    return 'file_{0}/{1}'.format(instance.author, filename)