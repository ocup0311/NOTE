# 透過將配置檔複製到 staticPodPath，以啟動 Static Pod

#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <FILE_PATH>"
    exit 1
fi

FILE_PATH=$1
STATICPOD_PATH="/etc/kubernetes/manifests"
FILENAME=$(basename "$FILE_PATH")
TARGET_PATH="${STATICPOD_PATH}/${FILENAME}"

if [ ! -f "$FILE_PATH" ]; then
    echo "Source file ${FILE_PATH} does not exist."
    exit 1
fi

sudo cp "$FILE_PATH" "$TARGET_PATH"

if [ $? -eq 0 ]; then
    echo "[ADD] Static Pod \"${FILENAME}\" created successfully"
else
    echo "[WARN] Failed to copy file ${FILENAME} to ${TARGET_PATH}."
    exit 1
fi
