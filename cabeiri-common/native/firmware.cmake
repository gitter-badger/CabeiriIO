cmake_minimum_required (VERSION 2.6)
project (Cabeiri_Firmware)

# The version number.
set (Cabeiri_Firmware_VERSION_MAJOR 0)
set (Cabeiri_Firmware_VERSION_MINOR 1)

option(ARDUINO "Compile for Arduino platform" OFF)
option(ARM "Compile for ARM platform" OFF)
option(AVR "Compile for AVR platform" ON)

# configure a header file to pass some of the CMake settings
# to the source code
configure_file (
  "${PROJECT_SOURCE_DIR}firmware/headers/configs.h.in"
  "${PROJECT_BINARY_DIR}intermediate/headers/configs.h"
  )

# add the binary tree to the search path for include files
include_directories ("${PROJECT_BINARY_DIR}")
include_directories ("${PROJECT_BINARY_DIR}intermediate/headers")
include_directories ("${PROJECT_BINARY_DIR}intermediate/native-instructions")

# generate and add intermediate code
include_directories ("${PROJECT_SOURCE_DIR}/compiler")
add_subdirectory (compiler)
set (EXTRA_LIBS ${EXTRA_LIBS} MakeIntermediate)

# add the executable
if (AVR)
    add_executable (Cabeiri_Firmware "${PROJECT_BINARY_DIR}src/avr/main.avr.cpp")
endif(AVR)

target_link_libraries (Cabeiri_Firmware  ${EXTRA_LIBS})

# add the install targets
install (TARGETS Cabeiri_Firmware DESTINATION bin)
install (FILES "${PROJECT_BINARY_DIR}/configs.h"
         DESTINATION include)
