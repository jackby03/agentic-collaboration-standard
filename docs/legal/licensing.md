# Licensing and relicensing notes

Resumen
- Este repositorio cambia su licencia principal de `MIT` a `Apache-2.0` para facilitar la compatibilidad con procesos institucionales como los de la Agentic AI Foundation / Linux Foundation.
- La documentación se propone bajo `CC-BY-4.0` (no implementada automáticamente en todos los archivos; revisar). 

Motivación
- `Apache-2.0` incluye una concesión de patentes explícita y es ampliamente aceptada en proyectos de fundaciones. Facilita la incorporación institucional y reduce riesgo legal para adoptantes corporativos.

Impacto en contribuciones
- Repositorio actual: revisión de `git shortlog` indica un único contribuyente humano principal (`Jack Del Aguila`).
- Si el proyecto tuviera múltiples contribuyentes, sería necesario obtener consentimiento de cada contribuyente para relicenciar sus aportes. En ese caso se recomienda adoptar un DCO o recopilar CLAs.

Pasos realizados
1. Reemplazada la licencia de repositorio por `Apache-2.0` (archivo `LICENSE`).
2. Añadido archivo `NOTICE` con atribución básica.
3. Actualizados los campos `license` en los manifiestos `package.json` y `pyproject.toml` principales.

Siguientes pasos recomendados
- Publicar un `MAINTAINERS.md` con contactos y confirmación de que el maintainer principal aprueba el cambio.
- Si hay colaboradores externos, solicitar su consentimiento mediante un mensaje público y/o un checklist de firmas.
- Añadir un `CONTRIBUTING.md` con DCO `Signed-off-by` para futuros commits.
- Actualizar `package.json`/`pyproject.toml` adicionales si los hay.

Contacto legal
- Para preguntas legales formales, contactar al maintainer y coordinar con el equipo legal de cualquier sponsor objetivo.
