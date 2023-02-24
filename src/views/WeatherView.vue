<template>
    <div>
        {{ $route.params.lat }} {{ $route.params.lon }}
    </div>
</template>

<script>

export default {
    name: 'WeatherView'
}

</script>
